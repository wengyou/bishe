import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
  } from 'react-native';
import {Button, Tabs} from '@ant-design/react-native';

const Detail = props => {
    const {navigation} = props;
    let rid = navigation.state.params.rid;
    useEffect(() => {
        if(rid) {
            onFetchDetail(rid);
        }
    }, [rid]);
    const [detailData, setDetailData] = useState({});
    console.log(detailData);
    const onFetchDetail = async (rid) => {
        let data = {};
        let url = 'http://www.wushiai.cn:8088/record/findOneRecord';
        await fetch(url, {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rid: rid
            })
        }).then((res) => {
          if (res.ok) {
            res.json().then(function(obj) {
                data = obj.data;
                setDetailData(data);
            })
          };
        })
        .catch((error) => {
            console.warn(error);
        })
      }
    return(
        <ScrollView>
            <Text style={{fontSize: 25}}>{detailData.rname}</Text>
            <Image style={{width: 400, height: 200, marginTop: 20}} source={{uri: detailData.rimage}} />
            <Text style={{fontSize: 20, marginTop: 20}}>{detailData.recordIntroduce}</Text>
            <View>
                {
                    detailData.recordImgList && detailData.recordImgList.map(item => {
                        return(
                            <Image key={item.did} style={{width: 400, height: 200, marginTop: 30}} source={{uri:item.detailPic}} />
                        )
                    })
                }
            </View>        
            <Text style={{textAlign: "right", marginRight: 20, marginTop: 20}}>{new Date(detailData.rdate).toLocaleDateString()}</Text>
        </ScrollView>
    )
};

export default Detail;