import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  Linking,
} from "react-native";

const Home = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={({ item }) => <Item data={item} />}
      />
    </View>
  );
};

const Item = ({ data }) => {
  return (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: data.urlToImage }} />

      <Text style={styles.itemTitle}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.itemBtn}>
        <Button
          onPress={() => {
            readFullArticle(data.url);
          }}
          title="Read More"
          color="#fff"
        />
      </View>
    </View>
  );
};

const readFullArticle = (url) => {
  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  );
};

export default function App() {
  const API_KEY = "6709616f3b16479ea39ddf6e76ed2914";
  const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2021-07-26&sortBy=publishedAt&apiKey=${API_KEY}`;
  const [data, setData] = React.useState([]);
  const [fetchingData, setFetchingData] = React.useState(true);

  React.useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        return data.articles;
      })
      .then((articles) => {
        setData(articles);
        setFetchingData(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (fetchingData) {
    return <Loading />;
  } else {
    return <Home data={data} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  itemContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  itemImage: {
    height: 200,
  },
  itemTitle: {
    textAlign: "center",
    padding: 20,
    fontSize: 17,
    color: "black",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  itemDescription: {
    fontSize: 17,
    padding: 10,
    margin: 20,
    color: "black",
    backgroundColor: "white",
  },
  itemBtn: {
    flexDirection: "row",
    backgroundColor: "black",
    color: "white",
    padding: 10,
    margin: 10,
    justifyContent: "center",
    borderRadius: 10,
  },
});
