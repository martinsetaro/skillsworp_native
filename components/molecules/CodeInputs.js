import React, { useRef, useState } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
const CodeInputs = ({
  codeConfirmation,
  handleChangeCode,
  marginBottom = "0%",
  handlerOnFocus,
}) => {
  const refFirstCode = useRef();
  const refSecondCode = useRef(null);
  const refThirdCode = useRef();
  const refFourthCode = useRef();
  const refFivethCode = useRef();
  const refSixthCode = useRef();

  return (
    <View style={[globalStyles.codeInputsGroup, { marginBottom }]}>
      <TextInput
        style={globalStyles.codeInput}
        ref={refFirstCode}
        onFocus={handlerOnFocus}
        value={codeConfirmation.value_1}
        keyboardType="phone-pad"
        maxLength={1}
        autoFocus={true}
        returnKeyType="next"
        onChangeText={(text) =>
          handleChangeCode("value_1", text, refSecondCode, false)
        }
        blurOnSubmit={false}
      />
      <TextInput
        style={globalStyles.codeInput}
        ref={refSecondCode}
        onFocus={handlerOnFocus}
        value={codeConfirmation.value_2}
        keyboardType="phone-pad"
        returnKeyType="next"
        blurOnSubmit={false}
        maxLength={1}
        onChangeText={(text) =>
          handleChangeCode("value_2", text, refThirdCode, false)
        }
      />
      <TextInput
        style={globalStyles.codeInput}
        ref={refThirdCode}
        onFocus={handlerOnFocus}
        value={codeConfirmation.value_3}
        keyboardType="phone-pad"
        maxLength={1}
        onChangeText={(text) =>
          handleChangeCode("value_3", text, refFourthCode, false)
        }
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput
        style={globalStyles.codeInput}
        ref={refFourthCode}
        keyboardType="phone-pad"
        onFocus={handlerOnFocus}
        value={codeConfirmation.value_4}
        maxLength={1}
        onChangeText={(text) =>
          handleChangeCode("value_4", text, refFivethCode, false)
        }
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput
        style={globalStyles.codeInput}
        ref={refFivethCode}
        onFocus={handlerOnFocus}
        keyboardType="phone-pad"
        value={codeConfirmation.value_5}
        maxLength={1}
        onChangeText={(text) =>
          handleChangeCode("value_5", text, refSixthCode, false)
        }
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput
        style={globalStyles.codeInput}
        ref={refSixthCode}
        onFocus={handlerOnFocus}
        value={codeConfirmation.value_6}
        keyboardType="phone-pad"
        maxLength={1}
        onChangeText={(text) =>
          handleChangeCode("value_6", text, refSixthCode, true)
        }
        returnKeyType="next"
        blurOnSubmit={false}
      />
    </View>
  );
};

export default CodeInputs;
