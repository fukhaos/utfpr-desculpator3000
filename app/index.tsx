import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "@/styles";
import { useState } from "react";
import { geradorDesculpa } from "@/service/ai/generator";


export default function Index() {
  const [evento, setEvento] = useState("");
  const [resposta, setResposta] = useState("");

  const callDesculpa = async () => {
    const desculpa = await geradorDesculpa(evento);
    setResposta(desculpa);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Desculpator 3000</Text>
      <Text style={styles.subtitulo}>
        Sua máquina de desculpas profissional
      </Text>

      <TextInput
        value={evento}
        placeholder="Digite o evento que você quer evitar ..."
        onChangeText={setEvento}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={callDesculpa}>
        <Text style={styles.buttonText}>Gerar Desculpa infalível</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sua desculpa está pronta </Text>
        <Text style={styles.cardText}>{resposta}</Text>
      </View>
    </View>
  );
}
