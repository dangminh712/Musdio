import React from "react";
import { NativeBaseProvider, Box, Text, Heading, VStack, FormControl, Input, Link, Button, Icon, HStack, Center, Pressable } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

function Footer({navigation,sect}) {
  const [selected, setSelected] = React.useState(sect);
  return <NativeBaseProvider>
      <Box flex={1} bg="black" safeAreaTop width="100%" maxW="600px" alignSelf="center">
        <Center flex={1}></Center>
        <HStack bg="black" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => { navigation.navigate('Home')}}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? "home" : "home"} />} color="white" size = "lg" />
            </Center>
          </Pressable>
          <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => { navigation.navigate('Search')}}>
            <Center>
              <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="lg" />
            </Center>
          </Pressable>
          <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => {navigation.navigate('TopTreding')}}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? "chart-bar" : "chart-bar"} />} color="white" size="lg" />
            </Center>
          </Pressable>
          <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => {navigation.navigate('Setting')}}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? "cog" : "cog"} />} color="white" size="lg" />
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>;
}
export default Footer;