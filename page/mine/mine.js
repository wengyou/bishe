import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ToastAndroid
  } from 'react-native';
import {InputItem, Button, } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-crop-picker';
import qs from "qs";

const Mine = props => {
    const [flag, setFlag] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [rid, setRid] = useState('');
    const [img, setImg] = useState('');
    const [form, setForm] = useState({
      username: '',
      password: '', 
      birthday: '2020-04-10',
      sex: '男',
      telephone: '',
      email: ''
    });
    const [upload, setUpload] = useState({
      rname: '',
      recordIntroduce: '',
      cid: '',
      rimage: ""
    })
    const onRegister = async () => {
        let url = 'http://www.wushiai.cn:8088/user/register';
        await fetch(url, {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        }).then((res) => {
          if (res.ok) {
            res.json().then(function(obj) {
                obj.data && setUserInfo(obj.data);
            })
          };
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const onLogin = async (form) => {
      let url = 'http://www.wushiai.cn:8088/user/login';
      await fetch(url, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telephone: form.telephone,
            password: form.password
          })
      }).then((res) => {
        if (res.ok) {
          res.json().then(function(obj) {
              setUserInfo(obj.data);
          })
        };
      })
      .catch((error) => {
          console.log(error);
      })
  }
  const onLogout = async () => {
    let url = 'http://www.wushiai.cn:8088/user/exit';
    await fetch(url, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    }).then((res) => {
      if (res.ok) {
        res.json().then(function(obj) {
            setFlag(true);
            setUserInfo({})
        })
      };
    })
    .catch((error) => {
        console.log(error);
    })
}
const onUpload = async () => {
  let url = 'http://www.wushiai.cn:8088/record/uploadRecordDemo';
  await fetch(url, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(upload)
  }).then((res) => {
    if (res.ok) {
      res.json().then(function(obj) {
        if(obj.flag) {
          setRid(obj.data.rid);
          ToastAndroid.show("上传成功", ToastAndroid.SHORT);
          upload.cid = '';
          upload.recordIntroduce = '';
          upload.rname = '';
          upload.rimage = '';
          setUpload({...upload});
        }
      })
    };
  })
  .catch((error) => {
      console.log(error);
  })
}
const onUploadImg = async () => {
  let url = 'http://www.wushiai.cn:8088/record/uploadImgsDemo';
  await fetch(url, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rid: rid,
        detailPic: img
      })
  }).then((res) => {
    if (res.ok) {
      res.json().then(function(obj) {
        if(obj.flag) {
          ToastAndroid.show("上传图片成功", ToastAndroid.SHORT);
          setImg('');
        }
      })
    };
  })
  .catch((error) => {
      console.log(error);
  })
}

 const uploadImg = (type) => {
  ImagePicker.openPicker({
    width: 200,
    height: 200,
    cropping: true
  }).then(image => {
    if(type == 'detail') {
      setImg(image.path)
    } else{
      upload.rimage = image.path;
      setUpload({...upload});
    }    
  });
 }
    return(
        <ScrollView>
          {
              !flag && JSON.stringify(userInfo) === '{}'  && <View>
                  <Text style={{textAlign: 'center', fontSize: 18, marginTop:10, color: '#009FCC'}}>用户注册</Text>
                  <InputItem
                      maxLength={10}
                      placeholder="用户名长度不超过10"
                      onChange={(value) => {
                        form.username = value;
                        setForm({...form})
                      }}
                      labelNumber={4}
                  >
                    用户名：
                  </InputItem>
                  <InputItem
                      type='password'
                      onChange={(value) => {
                        form.password = value;
                        setForm({...form})
                      }}
                      labelNumber={3}
                  >
                    密码：
                  </InputItem>
                  <InputItem
                      type='phone'
                      onChange={(value) => {
                        form.telephone = value;
                        setForm({...form})
                      }}
                      labelNumber={5}
                  >
                    手机号码：
                  </InputItem>
                  <InputItem
                      type='email'
                      onChange={(value) => {
                        form.email = value;
                        setForm({...form})
                      }}
                      labelNumber={3}
                  >
                    邮箱：
                  </InputItem>
                  {/* <View style={{marginTop:40, display: "flex"}}>
                    <Radio
                      checked={form.sex === '男'}
                      onChange={event => {
                        if (event.target.checked) {
                            form.sex = '男';
                            setForm({...form})
                        }
                      }}
                      style={{ borderWidth: 1, borderColor: '#999', margin: 10}}
                    >
                      男
                    </Radio>
                    <Radio
                      checked={form.sex === '女'}
                      onChange={event => {
                        if (event.target.checked) {
                            form.sex = '女';
                            setForm({...form})
                        }
                      }}
                      style={{ borderWidth: 1, borderColor: '#999', margin: 10}}
                    >
                      女
                    </Radio>
                  </View> */}
                  <Button
                    type='primary'
                    onPress={
                      () => {onRegister()}
                    }
                    style={{marginTop: 30 }}
                  >
                    注册
                  </Button>
                  <Text 
                    style={{color: '#009FCC', textAlign: 'right', marginRight: 20, marginTop: 10, fontSize: 16}} 
                    onPress={() => {setFlag(true)}}
                    >
                      登录
                  </Text>
              </View>
          }  
          {
            flag && JSON.stringify(userInfo) === '{}'  && <View>
              <Text style={{textAlign: 'center', fontSize: 18, marginTop:10, color: '#009FCC'}}>登录</Text>
                  <InputItem
                      type="phone"
                      onChange={(value) => {
                        form.telephone = value;
                        setForm({...form})
                      }}
                      labelNumber={4}
                  >
                    手机号：
                  </InputItem>
                  <InputItem
                      type='password'
                      onChange={(value) => {
                        form.password = value;
                        setForm({...form})
                      }}
                      labelNumber={3}
                  >
                      密码：
                  </InputItem>
                  <Button
                    type='primary'
                    onPress={
                      () => {onLogin(form)}
                    }
                    style={{marginTop: 30 }}
                  >
                    登录
                  </Button>
                  <Text 
                    style={{color: '#009FCC', textAlign: 'right', marginRight: 20, marginTop: 10, fontSize: 16}} 
                    onPress={() => {setFlag(false)}}
                    >
                      注册
                  </Text>
            </View>
          }
          {
            JSON.stringify(userInfo) !== '{}' && <View>
              <View style={{display: "flex", flexDirection: "row", borderBottomWidth:1, height: 150, width: '100%'}}>
                <Image source={require('../../img/head_img.jpg')} style={{width: 100, height: 100, borderRadius: 100, marginLeft: 20, marginTop: 20}} />
                <Text style={{fontSize: 30, marginTop: 40, marginLeft: 30}}>{userInfo.username}</Text>
                <Text
                  style={{color: '#009FCC', marginTop: 10, fontSize: 16, marginLeft: 120}}
                  onPress={() => {
                    onLogout()
                  }}
                >
                  退出
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                  <Text style={{color: '#00BBFF'}}>您是管理员身份，可向后台数据库添加数据</Text>
                  <View style={{backgroundColor: "#fff", width: '100%', marginTop: 20}}>
                      <Text style={{marginTop: 20}}>上传内容封面：</Text>
                      <InputItem
                          value={upload.rname}
                          onChange={(value) => {
                            upload.rname = value;
                            setUpload({...upload});
                          }}
                          labelNumber={4}
                      >
                          标题：
                    </InputItem> 
                    <InputItem
                          value={upload.recordIntroduce}
                          onChange={(value) => {
                            upload.recordIntroduce = value;
                            setUpload({...upload});
                          }}
                          labelNumber={4}
                      >
                          简介：
                    </InputItem>
                    <InputItem
                          value={upload.cid}
                          onChange={(value) => {
                            upload.cid = value;
                            setUpload({...upload});
                          }}
                          labelNumber={4}
                      >
                          分类：
                    </InputItem>  
                    <TouchableOpacity onPress={() => uploadImg()} style={{width: 200}}>
                      <View>
                        {
                          upload.rimage === "" ? <Text style={{marginTop: 20, color: '#009FCC', marginLeft: 14}}>点击上传封面图片</Text> : <View>
                            <Text style={{fontSize: 16, marginTop: 20, marginLeft:16}}>封面图片:</Text>
                              <Image source={{uri: upload.rimage}} style={{width: 200, height: 200, marginLeft: 16, marginTop: 10}} />
                          </View>  
                        }
                      </View>
                    </TouchableOpacity>
                    <Button 
                      type='primary'
                      style={{marginTop: 20}}
                      onPress={() => onUpload()}
                    >
                        确认上传
                    </Button>
                  </View>
                  <View style={{backgroundColor: "#fff", width: '100%', marginTop: 20}}>
                      <Text style={{marginTop: 20}}>上传内容详情图片：</Text>
                      <TouchableOpacity onPress={() => uploadImg('detail')} style={{width: 200}}>
                      <View>
                        {
                          img === "" ? <Text style={{marginTop: 20, color: '#009FCC', marginLeft: 14}}>点击上传图片</Text> : <View>
                            <Text style={{fontSize: 16, marginTop: 20, marginLeft:16}}>内容详情图片:</Text>
                              <Image source={{uri: img}} style={{width: 200, height: 200, marginLeft: 16, marginTop: 10}} />
                          </View>  
                        }
                      </View>
                    </TouchableOpacity>
                    <Button 
                      type='primary'
                      style={{marginTop: 20}}
                      onPress={() => onUploadImg()}
                    >
                        上传图片
                    </Button>
                  </View>
              </View>
            </View>
          }
        </ScrollView>
    )
};

export default Mine;