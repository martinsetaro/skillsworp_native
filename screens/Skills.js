import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { H2, P } from "../components/atoms";
import { registrationPsStyles } from "../styles/registrationPsStyles";
import { Button, Skill, TextLink } from "../components/molecules";
import { FlatList } from "react-native-gesture-handler";
import { DefaultAlert } from "../utils/defaultAlert";
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../redux/skillsDucks";
import { loadProfileInfo, updateProfile } from "../redux/userDucks";
import { colors } from "../styles/colors";

const Skills = () => {
  const skills = useSelector((state) => state.skills);
  const updateInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [resultToken, setResultToken] = useState();
  const [savedSkills, setSavedSkills] = useState([]);
  const [skillsResults, setSkillsResults] = useState([]);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [wasValidated, setWasValidated] = useState(false);

  useEffect(() => {
    const loadSkills = async () => {
      const storageUser = await AsyncStorage.getItem("swp_info");
      const jsonUser = JSON.parse(storageUser);

      setResultToken(jsonUser);
      dispatch(getSkills(jsonUser.tokens.access.token));
    };
    loadSkills();
  }, []);

  useEffect(() => {
    const getResults = () => {
      if (!skills || Object.keys(skills).length <= 0) return;

      setSkillsResults(skills.skills.results);
    };
    getResults();
    return () => {
      setSkillsResults([]);
    };
  }, [skills]);

  useFocusEffect(
    React.useCallback(() => {
      const hasSavedSkills = () => {
        if (!resultToken) {
          return;
        }
        if (resultToken.user.skills.length > 0) {
          const formattedSkills = resultToken.user.skills.map((skill) => {
            if (Object.keys(skill).length > 0 && typeof skill === "object") {
              return skill.id;
            }
            return skill;
          });

          setSavedSkills(formattedSkills);
          setWasValidated(true);
        }
      };
      hasSavedSkills();
    }, [resultToken])
  );

  useEffect(() => {
    const handleUpdate = async () => {
      const { infoUpdate, errorMessage } = updateInfo;
      if (!infoUpdate && !errorMessage) {
        setVisibleStatus(false);
        return;
      }

      if (errorMessage && !infoUpdate) {
        DefaultAlert("Oopss...", errorMessage);
        setVisibleStatus(false);
        return;
      }

      if (!errorMessage && infoUpdate) {
        const newInfo = resultToken;
        newInfo.user.skills = savedSkills;
        await AsyncStorage.setItem("swp_info", JSON.stringify(newInfo));

        //dispatch(resetUserReducer());
        setVisibleStatus(false);
        dispatch(loadProfileInfo(newInfo));
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigation" }],
        });
        return;
      }
    };
    handleUpdate();
  }, [updateInfo]);

  const handleContinue = () => {
    // if (savedSkills.length == 0) {
    //   DefaultAlert("Ooopss", "Select at least 1 skill to show in your profile");
    //   return;
    // }
    dispatch(
      updateProfile(
        resultToken.user.id,
        { skills: savedSkills },
        resultToken.tokens.access.token
      )
    );
    setVisibleStatus(true);
  };

  const handleSelectSkills = (item) => {
    const skillsTmp = savedSkills.filter((idSkill) => idSkill === item.id);

    if (savedSkills.length == 0 && skillsTmp.length === 0) {
      DefaultAlert(
        "Ooopssss...",
        "All the required skills are selected, remove or press 'Confirm' to continue"
      );
      return;
    }
    if (skillsTmp.length > 0) {
      setSavedSkills(
        savedSkills.filter((skillState) => skillState !== item.id)
      );
    } else {
      setSavedSkills((prevState) => [...prevState, item.id]);
    }
  };

  const handleChangeSkillColor = (active, setActive) => {
    if (savedSkills.length < 5) {
      setActive(!active);
    }
    if (savedSkills.length === 5 && active) {
      setActive(false);
    }
  };

  const validateIsActive = (item) => {
    if (savedSkills) {
      return savedSkills.includes(item);
    }
  };

  return (
    <View style={registrationPsStyles.containerSkills}>
      <View style={{ height: "60%", width: "100%" }}>
        <H2 plainText="Skills" textAlign="auto" marginBottom={"4%"} />
        <P
          plainText="Select the desired skills to start matching up profiles"
          fontSize={Platform.OS === "android" ? 14 : 16}
          textAlign="auto"
          marginBottom={"2%"}
        />
        <View style={registrationPsStyles.listSkillsWrapper}>
          {skillsResults.length > 0 && savedSkills && wasValidated && (
            <FlatList
              data={skillsResults ? skillsResults : []}
              renderItem={({ item }) => (
                <Skill
                  data={item}
                  type={1}
                  skillsLength={savedSkills.length}
                  handleChangeSkillColor={handleChangeSkillColor}
                  isActive={!savedSkills ? false : validateIsActive(item.id)}
                  handleOnPress={() => handleSelectSkills(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{
                flexWrap: "wrap",
              }}
              scrollEventThrottle={1900}
              numColumns={4}
              scrollEnabled
            />
          )}
        </View>
      </View>

      <View style={{ height: "20%", width: "100%" }}>
        <Button
          plainText={
            visibleStatus ? (
              <ActivityIndicator
                size="small"
                color={colors.backgroundPrimary}
                style={{ marginBottom: "5%" }}
              />
            ) : (
              `CONFIRM ${savedSkills.length}`
            )
          }
          type={3}
          pressHandler={() => handleContinue()}
          marginBottom={"2.5%"}
        />
        <TextLink
          type={4}
          pressHandler={() => navigation.goBack()}
          plainText="Back"
          fontSize={Platform.OS === "android" ? 15 : 18}
        />
      </View>
    </View>
  );
};

export default Skills;
