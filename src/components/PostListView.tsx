import { FlashList } from "@shopify/flash-list";
import { FlatList, View } from "react-native";
import { getPostListData } from "../mock/recommend";
import { useCallback, useEffect, useState } from "react";
import { PostListCell } from "./PostListCell";
import { usePostStats } from "../store/usePostStats";
import { useSelfOperations } from "../store/useSelfOperations";

export function PostListView() {
    const [data, setData] = useState([]);
    useEffect(() => {
        requestData()
    }, [])
    const requestData = () => {
        getPostListData()
            .then((res: any) => {
                console.log("++++++++res+++++++++")
                console.log(res)
                let arr: any[] = [];
                for (let index = 0; index < 10; index++) {
                   arr = arr.concat(res.posts);
                }
                setData(arr)
                usePostStats.getState().setStats(res.postStatMap)
                useSelfOperations.getState().setOperations(res.selfOperationMap)
            })
    }
    const renderItem = useCallback(({ item, index }) => {
        return (
            <PostListCell post={item} />
        )
    }, []) 
    return (
        <FlashList
            data={data}
            renderItem={renderItem}
            getItemType={(item) => {
                return item.cellIdentifier;
            }}
        />
    )
}