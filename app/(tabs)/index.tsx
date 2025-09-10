import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [valor, setValor] = useState("");
  const [juros, setJuros] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [taxas, setTaxas] = useState("");
  const [resultado, setResultado] = useState({ total: 0, parcela: 0 });

  const formatCurrency = (v: number) =>
    `R$ ${v.toFixed(2).replace(".", ",")}`;

  const calcular = () => {
    const C = parseFloat(valor.replace(",", ".")) || 0;
    const i = (parseFloat(juros.replace(",", ".")) || 0) / 100;
    const n = parseInt(parcelas) || 0;
    const extra = parseFloat(taxas.replace(",", ".")) || 0;

    if (C <= 0 || n <= 0) {
      setResultado({ total: 0, parcela: 0 });
      return;
    }

    const montante = C * Math.pow(1 + i, n) + extra;
    const parcela = montante / n;

    setResultado({ total: montante, parcela });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Simulador de Financiamento</Text>
        </View>

        <Text style={styles.label}>Valor do financiamento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <Text style={styles.label}>Taxa de juros ao mês:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a taxa de juros"
          keyboardType="numeric"
          value={juros}
          onChangeText={setJuros}
        />

        <Text style={styles.label}>Número de parcelas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número de parcelas"
          keyboardType="numeric"
          value={parcelas}
          onChangeText={setParcelas}
        />

        <Text style={styles.label}>Demais taxas e custos:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o total de taxas e custos adicionais"
          keyboardType="numeric"
          value={taxas}
          onChangeText={setTaxas}
        />

        <TouchableOpacity style={styles.button} onPress={calcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        <Text style={styles.result}>
          Valor total a ser pago: {formatCurrency(resultado.total)}
        </Text>
        <Text style={[styles.result, { color: "#0066cc" }]}>
          Valor da parcela: {formatCurrency(resultado.parcela)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5efec" },
  content: { padding: 16 },
  header: {
    backgroundColor: "#3d2b23",
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
  },
  headerText: { color: "#fff", fontWeight: "700", fontSize: 18, textAlign: "center" },
  label: {
    color: "#2f5b9e",
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3d2b23",
    padding: 12,
    marginTop: 18,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  result: {
    marginTop: 12,
    fontWeight: "600",
    fontSize: 16,
    color: "#3d2b23",
  },
});
