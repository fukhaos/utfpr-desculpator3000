import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "@/styles";
import { useState } from "react";
import {
  geradorDesculpa,
  geradorImagem,
  custoEstimadoTexto,
  custoEstimadoImagem,
  Usage,
} from "@/service/ai/generator";

const usageVazio: Usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };

export default function Index() {
  const [evento, setEvento] = useState("");
  const [resposta, setResposta] = useState("");
  const [usage, setUsage] = useState<Usage>(usageVazio);
  const [imagem, setImagem] = useState<string | null>(null);
  const [usageImagem, setUsageImagem] = useState<Usage>(usageVazio);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImagem, setIsLoadingImagem] = useState(false);

  const callDesculpa = async () => {
    setResposta("");
    setUsage(usageVazio);
    setImagem(null);
    setUsageImagem(usageVazio);
    setIsLoading(true)
    const { texto, usage: usoTokens } = await geradorDesculpa(evento);
    setResposta(texto);
    setUsage(usoTokens);

    setIsLoading(false)
    setEvento("");

    setIsLoadingImagem(true);
    const { url: imagemGerada, usage: usoTokensImagem } = await geradorImagem(texto);
    setImagem(imagemGerada);
    setUsageImagem(usoTokensImagem);
    setIsLoadingImagem(false);
  };

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
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
        <Text style={styles.buttonText}>{
          isLoading ? "Carregando..." : "Gerar Desculpa infalível"
        }</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sua desculpa está pronta </Text>
        <Text style={styles.cardText}>{resposta}</Text>

        {resposta ? (
          <Text style={styles.usageText}>
            Tokens usados: {usage.totalTokens} (entrada: {usage.inputTokens}, saída: {usage.outputTokens}) · Custo estimado: ${custoEstimadoTexto(usage).toFixed(6)}
          </Text>
        ) : null}
      </View>

      {resposta ? (
        <View style={styles.card}>
          {isLoadingImagem ? (
            <Text style={styles.cardText}>Gerando imagem...</Text>
          ) : imagem ? (
            <>
              <Text style={styles.usageText}>
                Tokens usados: {usageImagem.totalTokens} (entrada: {usageImagem.inputTokens}, saída: {usageImagem.outputTokens}) · Custo estimado: ${custoEstimadoImagem(usageImagem).toFixed(6)}
              </Text>
              <Image source={{ uri: imagem }} style={styles.image} resizeMode="contain" />
            </>
          ) : (
            <Text style={styles.cardText}>Não foi possível gerar a imagem.</Text>
          )}
        </View>
      ) : null}
    </ScrollView>
  );
}
