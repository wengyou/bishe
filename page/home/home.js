import React, {useEffect, useState} from 'react'; 
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Tabs, Button } from '@ant-design/react-native';
import { StackNavigator } from 'react-navigation';
import Detail from '../dedtail/detail';

const Home = props => {
  let {navigation} = props;
  const style = {
    display: 'flex',
    flexDirection: 'column',
  };
  const itemStyle = {
    width: 410,
    height: 120,
    backgroundColor: '#fff',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState([]);
  const [targetCon, setTargetCon] = useState([]);
  useEffect(() => {
    const onFetchCate = async () => {
      let data = [];
      let url = 'http://www.wushiai.cn:8088/category/categoryAll';
      await fetch(url).then((res) => {
        if (res.ok) {
          res.json().then(function(obj) {
              obj.data.map(item => {
                return data.push(item.cname);
              })
              const newData = data.map(item => ({title :item}));
              newData.unshift({title: "推荐"})
              setCategory(newData);
          })
        };
      })
      .catch((error) => {
          console.warn(error);
      })
    }
    onFetchCate();
    const onFetchNews = async () => {
      let data = [];
      let url = 'http://www.wushiai.cn:8088/record/newestRecord';
      await fetch(url).then((res) => {
        if (res.ok) {
          res.json().then(function(obj) {
              data = obj.data;
              setContent(data);
          })
        };
      })
      .catch((error) => {
          console.warn(error);
      })
    }
    onFetchNews();
  }, []);
  const onFetchCon = async (cid) => {
    let data = [];
    let url = 'http://www.wushiai.cn:8088/record/sortRecord';
    await fetch(url, {
      method:'POST',
      headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: cid
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then(function(obj) {
            data = obj.data;
            setTargetCon(data);
        })
      };
    })
    .catch((error) => {
        console.warn(error);
    })
  }
  return(
    <>
      <Tabs 
        tabs={category}
        onChange={
          (tab, index) => {
              if(tab && tab.title !== "推荐") {
                const cid = index + 1;
                onFetchCon(cid);
              };
          }
        }
        tabBarTextStyle={{fontSize: 18}}
      >
          <ScrollView style={style}>
            {
              content.length !==0 && content.map(item => {
                return(
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', {rid: item.rid})}>
                    <View 
                      key={item.rid} 
                      style={itemStyle}
                    >
                      <View style={{display: "flex", flexDirection: "row"}}>
                        <Image style={{width: 100, height: 80, marginLeft: 10, marginTop: 10}} source={{uri: item.rimage}} />
                        <Text style={{width: 200, fontSize: 20, marginLeft: 20, marginTop: 20}}>{item.rname}</Text>
                      </View>
                      <Text style={{textAlign: "right", marginRight: 20}}>{item.rdate}</Text>
                    </View>
                  </TouchableOpacity>               
                )
              })
            }
          </ScrollView>
          <ScrollView style={style}>
          {
              targetCon.length !==0 && targetCon.map(item => {
                return(
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', {rid: item.rid})}>
                    <View key={item.rid} style={itemStyle}>
                      <View style={{display: "flex", flexDirection: "row"}}>
                        <Image style={{width: 100, height: 80, marginLeft: 10, marginTop: 10}} source={{uri: item.rimage}} />
                        <Text style={{width: 200, fontSize: 20, marginLeft: 20, marginTop: 20}}>{item.rname}</Text>
                      </View>
                      <Text style={{textAlign: "right", marginRight: 20}}>{item.rdate}</Text>
                    </View>
                  </TouchableOpacity>                  
                )
              })
            }
          </ScrollView>
          <ScrollView style={style}>
          {
              targetCon.length !==0 && targetCon.map(item => {
                return(
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', {rid: item.rid})}>
                      <View key={item.rid} style={itemStyle}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                          <Image style={{width: 100, height: 80, marginLeft: 10, marginTop: 10}} source={{uri: item.rimage}} />
                          <Text style={{width: 200, fontSize: 20, marginLeft: 20, marginTop: 20}}>{item.rname}</Text>
                        </View>
                        <Text style={{textAlign: "right", marginRight: 20}}>{item.rdate}</Text>
                      </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
          <ScrollView style={style}>
          {
              targetCon.length !==0 && targetCon.map(item => {
                return(
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', {rid: item.rid})}>
                    <View key={item.rid} style={itemStyle}>
                      <View style={{display: "flex", flexDirection: "row"}}>
                        <Image style={{width: 100, height: 80, marginLeft: 10, marginTop: 10}} source={{uri: item.rimage}} />
                        <Text style={{width: 200, fontSize: 20, marginLeft: 20, marginTop: 20}}>{item.rname}</Text>
                      </View>
                      <Text style={{textAlign: "right", marginRight: 20}}>{item.rdate}</Text>
                    </View>
                  </TouchableOpacity>                
                )
              })
            }
          </ScrollView>
          <ScrollView style={style}>
          {
              targetCon.length !==0 && targetCon.map(item => {
                return(
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', {rid: item.rid})}>
                    <View key={item.rid} style={itemStyle}>
                      <View style={{display: "flex", flexDirection: "row"}}>
                        <Image style={{width: 100, height: 80, marginLeft: 10, marginTop: 10}} source={{uri: item.rimage}} />
                        <Text style={{width: 200, fontSize: 20, marginLeft: 20, marginTop: 20}}>{item.rname}</Text>
                      </View>
                      <Text style={{textAlign: "right", marginRight: 20}}>{item.rdate}</Text>
                    </View>
                  </TouchableOpacity>              
                )
              })
            }
          </ScrollView>
      </Tabs>
    </>
  )
}

export default Home;