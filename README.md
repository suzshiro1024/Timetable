# TimeTable

Simple Timetable

## Overview

Displays train timetables in the form of departure signs.

### Description

Displays the most recent trains using time data made by JavaScript.

### Data format

```
${array name}["${departure time}"] = {track: "",type: "",destination: "",arrive: "",departure: "",message: ""};
```

#### array name
It is recommended that array_name be a name that connects three pieces of information: the station name, the up/down line, and the day of the week.

- example

  Kanayama station (NH34:Meitetsu Nagoya Line) up line weekday schedule => **NH34_UP_WD**
  Nagoya station (NH36:Meitetsu Nagoya Line) down line holiday schedule => **NH36_DOWN_HD**

#### departure time
Describe the departure time as a four-digit string of numbers.

- example

  A Train departing at 9:34 => **"934"**
  A Train departing at 14:56 => **"1456"**

#### associative array keys

![demo_photo drawio](https://user-images.githubusercontent.com/89633058/146638874-e490e9ad-ff80-4346-9a30-81efd76cbf47.png)

1. **track**
  Store the train's departure and arrival track No.

2. **type**
  Store the train type (e.g., "特急").

3. **destination**
  Stores the destination of the train (e.g., "豊橋").

4. **arrive**
  Store the arrive time of the train (e.g. "14:42").

5. **departure**
  Store the departure time of the train (e.g. "14:42").

6. **message**
  Show remarks about this train. Store down changes in train types, direct connections to other lines, etc.

#### data example

```
$IY11_UP_WD["659"] = {track: "3",type: "急行",destination: "吉良吉田",arrive: "6:59",departure: "6:59",message: "名古屋から普通、鳴海から急行"};
```

### Demo

![sample](https://user-images.githubusercontent.com/89633058/146644034-0e70ec0c-b126-41ae-bfc4-f7027478ec45.gif)