import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { getPostListData } from "../mock/recommend";
import { useEffect, useState } from "react";
import { PostListCell } from "./PostListCell";

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
                setData(res.posts)
            })
    }
    const renderItem = ({ item, index }) => {
        return (
            <PostListCell post={item} />
        )
    }
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