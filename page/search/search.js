import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
  } from 'react-native';
import { SearchBar } from '@ant-design/react-native';

const Search = props => {
    const {navigation} = props;
    const itemStyle = {
        width: 410,
        height: 120,
        backgroundColor: '#fff',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }
    const [value, setValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const onSearch = async (value) => {
        let url = 'http://www.wushiai.cn:8088/record/searchRecord';
        await fetch(url, {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({rname: value})
        }).then((res) => {
          if (res.ok) {
            res.json().then(function(obj) {
                console.log('1');
                console.log(obj);
                setSearchData(obj.data);
            })
          };
        })
        .catch((error) => {
            console.log(error);
        })
    } 
    useEffect(() => {
        const onFetchNews = async () => {
            let data = [];
            let url = 'http://www.wushiai.cn:8088/record/newestRecord';
            await fetch(url).then((res) => {
              if (res.ok) {
                res.json().then(function(obj) {
                    data = obj.data;
                    setSearchData(data);
                })
              };
            })
            .catch((error) => {
                console.warn(error);
            })
          }
          onFetchNews();
    }, []);
    return(
        <ScrollView>
            <View style={{ marginTop: 30 }}>
                <SearchBar
                    value={value}
                    placeholder="搜索"
                    onSubmit={value => {
                        onSearch(value)
                    }}
                    onCancel={(value) => {onSearch(value)}}
                    onChange={value => {setValue(value)}}
                    showCancelButton
                    cancelText="搜索"
                />
            </View>  
            {
                searchData.length !== 0 && searchData.map(item => {
                    return(
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', {rid: item.rid})}>
                            <View 
                                key={item.rid} 
                                style={itemStyle}
                            >
                                <View style={{display: "flex", flexDirection: "row"}}>
                                <Image style={{width: 100, height: 80, marginLeft: 20}} source={{uri: item.rimage}} />
                                <Text style={{width: 200, fontSize: 20, marginLeft: 20, marginTop: 20}}>{item.rname}</Text>
                                </View>
                                <Text style={{textAlign: "right", marginRight: 20}}>{item.rdate}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
}

export default Search;