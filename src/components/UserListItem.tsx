import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { IState, IUser } from "../types";
import { loadUsers } from "../redux/slices/usersSlice";
import Loader from "./Loader";

const UserRenderer = (props: any) => {
  let user: IUser = props.item;
  return (
    <View style={styles.cardWrapper}>
      <Image
        style={styles.image}
        source={{ uri: "https://avatar.iran.liara.run/public/12" }}
      />
      {user.isBuyer && (
        <View style={styles.buyer}>
          <Text style={styles.buyerText}>Buyer</Text>
        </View>
      )}
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {`${user.firstName} ${user.lastName}`}
      </Text>
      <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
        @{`${user.userName}`}
      </Text>
    </View>
  );
};

const UserListItem = () => {
  const dispatch = useDispatch();
  const { totalPage, users, isLoading, error } = useSelector(
    (state: IState) => state.users
  );
  const { token } = useSelector((state: IState) => state.auth);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(loadUsers({ page, token }));
  }, [page]);

  return (
    <View>
      {users && users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={UserRenderer}
          numColumns={2}
          keyExtractor={(data, index) => `${data._id!}_${index}`}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            // implement infinte scrolling, check if there is total page and its greater
            // than zero then increment page by one until it reaches totalpage
            if (totalPage && totalPage > 0 && page < totalPage) {
              setPage((prevPage) => prevPage + 1);
            }
          }}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "700" }}>
            No Users Could Be Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 10,
    margin: 10,
    width: 160,
    position: "relative",
  },
  image: {
    width: 150,
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
    objectFit: "contain",
  },
  buyer: {
    position: "absolute",
    top: 10,
    right: 10,
    // backgroundColor: Colors.primaryColor,
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primaryColor,
  },
  buyerText: {
    color: Colors.primaryColor,
    fontWeight: "500",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 3,
    textAlign: "center",
  },
  username: {
    color: Colors.primaryColor,
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
  },
});
