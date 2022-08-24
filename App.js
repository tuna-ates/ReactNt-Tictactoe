import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { VStack, HStack, Flex } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import { Alert, Modal, Pressable } from "react-native";
function Box({ value, onPress, highlighted }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Flex
        w={100}
        h={100}
        center
        style={{ backgroundColor: highlighted ? "lightgreen" : "lightgray" }}
      >
        <Text style={{ fontSize: 56 }}>{value}</Text>
      </Flex>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    Color:'blue',
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#25315C",
    borderRadius: 20,
    padding: 70,
    alignItems: "center",
    shadowColor: "CBA8FF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button1:{
    backgroundColor:"red"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
});
const board1 = [
  ["0,0", "0,1", "0,2"],
  ["1,0", "1,1", "1,2"],
  ["2,0", "2,1", "2,2"],
  ["0,0", "1,0", "2,0"],
  ["0,1", "1,1", "2,1"],
  ["0,2", "1,2", "2,2"],
  ["0,0", "1,1", "2,2"],
  ["0,2", "1,1", "2,0"],
];

const initialGameState = {
  board: {
    "0,0": null,
    "0,1": null,
    "0,2": null,
    "1,0": null,
    "1,1": null,
    "1,2": null,
    "2,0": null,
    "2,1": null,
    "2,2": null,
  },
  playerStartsFirst: true,
  gameStarted: false,
  gameEnded: false,
  winner: "none",
  ısDraw: false,
  onePlayer: false,
  twoPlayer: false,
  currentPlayer: "X",
  alert1: false,
  alert2:false,
  alert3:false,
};

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [game, setGame] = useState(initialGameState);
  console.log(game);

  function PlayerTurn(position, value) {
    if (game.gameStarted === false) return;
    console.log(position, value);
    if (game.gameEnded) return;
    if (game.board[position] == null) {
      if (game.onePlayer || game.twoPlayer) {
        setPosition(position, game.currentPlayer);
        if (game.twoPlayer) {
          setGame((prevState) => ({
            ...prevState,
            currentPlayer: prevState.currentPlayer === "X" ? "O" : "X",
          }));
        } else if (game.onePlayer) {
          chooseEmptySquare(position);
        }
      }
    }
  }

  function setPosition(position1, value1) {
    if (game.board[position1] !== null) return;
    setGame((prevState) => ({
      ...prevState,
      board: { ...prevState.board, [position1]: value1 },
    }));
  }

  function computerGame(position) {
    //if(game.board[position]!==null)
    setGame((prevState) => ({
      ...prevState,
      board: { ...prevState.board, [position]: "O" },
    }));
  }

  function chooseEmptySquare(position) {
    const arr = Object.keys(game.board);
    var nullsquare = arr.filter(
      (a) => game.board[a] === null && a !== position
    );
    const oneEmptySquare = Math.floor(Math.random() * nullsquare.length);
    var position1 = nullsquare[oneEmptySquare];
    return computerGame(position1);
  }

  function checkWinner(board) {
    for (var i = 0; i < board1.length; i++) {
      const [a, b, c] = board1[i];
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        setGame((prevState) => ({ ...prevState, winner: board[a] }));
        console.log("kazanan var!");
        setGame((prevState) => ({ ...prevState, gameEnded: true }));
        setModalVisible(true);
        //return game.board[a];
        console.log(game.winner);
      }
    }
  }
  function ısBoardFull(board) {
    if (Object.keys(board).every((key) => board[key] != null)) {
      setGame((prevState) => ({ ...prevState, ısDraw: true }));
      setModalVisible1(true);
    }
    return true;
  }

  const createAlert = () =>
    Alert.alert(
      "!!!",
      "Oyuna başlamak için lütfen start butonuna tıklayınız.",
      [
        { text: "OK", onPress: () => {} },
      ]
    );
    const createAlert1 = () =>
    Alert.alert(
      "!!!",
      "Lütfen modunu seçiniz.",
      [
        
        { text: "OK", onPress: () => console.log("OK Pressed") },
        
      ]
    );
  useEffect(() => {
    if (!game.gameStarted) return;
    if (!checkWinner(game.board)) {
      ısBoardFull(game.board);
    }
  }, [game.board]);

  return (
    <VStack fill center spacing={2}>
      {!game.alert1 ? createAlert() : null}
      <HStack spacing={2} shouldWrapChildren>
        <Box
          value={game.board["0,0"]}
          onPress={() => PlayerTurn("0,0", "X")}
        ></Box>
        <Box
          value={game.board["0,1"]}
          onPress={() => PlayerTurn("0,1", "X")}
        ></Box>
        <Box
          value={game.board["0,2"]}
          onPress={() => PlayerTurn("0,2", "X")}
        ></Box>
      </HStack>
      <HStack spacing={2} shouldWrapChildren>
        <Box
          value={game.board["1,0"]}
          onPress={() => PlayerTurn("1,0", "X")}
        ></Box>
        <Box
          value={game.board["1,1"]}
          onPress={() => PlayerTurn("1,1", "X")}
        ></Box>
        <Box
          value={game.board["1,2"]}
          onPress={() => PlayerTurn("1,2", "X")}
        ></Box>
      </HStack>
      <HStack spacing={2} shouldWrapChildren>
        <Box
          value={game.board["2,0"]}
          onPress={() => PlayerTurn("2,0", "X")}
        ></Box>
        <Box
          value={game.board["2,1"]}
          onPress={() => PlayerTurn("2,1", "X")}
        ></Box>
        <Box
          value={game.board["2,2"]}
          onPress={() => PlayerTurn("2,2", "X")}
        ></Box>
      </HStack>
      <HStack spacing={4}>
        <Button
          title="Start Game"
          style={{ marginRight: 50 }}
          onPress={() => {
            setGame(
              (prevState) => ({ ...prevState, alert1: true,gameStarted: true,alert3:true}),
            );
            {!game.alert2?<View style={styles.container}>{createAlert1()}</View>:null}
            
          }}
        />
        <Button title="Restart" onPress={() => setGame(initialGameState)} />
      </HStack>
      {game.alert3?<HStack  spacing={10}>
            <Button
            style={styles.button1}
              title="1 Oyunculu mod"
              onPress={() =>
                setGame((prevState) => ({ ...prevState, onePlayer: true,alert1:true }))
              }
            ></Button>
            <Button
            style={styles.button1}
              title="2 Oyunculu mod"
              onPress={() =>
                setGame((prevState) => ({ ...prevState, twoPlayer: true,alert1:true }))
              }
            ></Button>
          </HStack>:null}
      
      <HStack>
        {game.winner !== "none" ? (
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Kazanan:{game.winner}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => (
                      setModalVisible(!modalVisible)
                    )}
                  >
                    <Text style={styles.textStyle}>Kapat</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        ) : null}
      </HStack>
      <HStack>
        {game.ısDraw === true ? (
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible1(!modalVisible1);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Kazanan Yok!!!</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => (
                      setModalVisible1(!modalVisible1)
                    )}
                  >
                    <Text style={styles.textStyle}>Kapat</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        ) : null}
      </HStack>
    </VStack>
  );
}
