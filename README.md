
# PickleBall



## Installation

Install pickleball with npx expo

```bash
  npx expo Install
```

    
## Run in your phone

- To run the app in your phone you need to dowload "expo go"

- But since we use react-native-firebase so we need to use "eas build"

- If you don't have any build yet (or you add new dependencies) you need to run this command (it may take about 30m - 4h to build it on "eas cloud free tier") (i have build it already so you don't have to build if you don't add new dependencies)
```bash
eas build --profile development --platform <YOUR_BUILD_DEVICE> (android or ios)
```

- After build is completed, you can dowload the development app on your device.

- Start the development client

```bash
  npx expo start --dev-client
```

