import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Financiamento() {
  const [valorBem, setValorBem] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularFinanciamento = () => {
    const c = parseFloat(valorBem); // Valor do bem
    const i = parseFloat(taxaJuros) / 100; // Taxa de juros mensal (em percentual)
    const t = parseInt(parcelas); // Número de parcelas

    // Cálculos
    const montante = c * Math.pow(1 + i, t); // Montante total
    const parcela = montante / t; // Parcela mensal

    setResultado(`Valor da parcela: R$${parcela.toFixed(2)}\nMontante total: R$${montante.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulação de Financiamento</Text>
      
      <Text>Valor do Bem</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valorBem}
        onChangeText={setValorBem}
      />
      
      <Text>Número de Parcelas</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={parcelas}
        onChangeText={setParcelas}
      />
      
      <Text>Taxa de Juros (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={taxaJuros}
        onChangeText={setTaxaJuros}
      />
      
      <Button title="Calcular" onPress={calcularFinanciamento} />
      
      {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
