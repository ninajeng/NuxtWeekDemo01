export const useCityData = () => {
  const cityZoneList = ref({
    Taipei: {
      name: "臺北市",
      zones: [
        {
          name: "中山區",
          zipCode: 104,
        },
        {
          name: "松山區",
          zipCode: 105,
        },
        {
          name: "信義區",
          zipCode: 110,
        },
      ],
    },
    Taichung: {
      name: "臺中市",
      zones: [
        {
          name: "中區",
          zipCode: 400,
        },
        {
          name: "豐原區",
          zipCode: 420,
        },
        {
          name: "大甲區",
          zipCode: 437,
        },
      ],
    },
    Kaohsiung: {
      name: "高雄市",
      zones: [
        {
          name: "前金區",
          zipCode: 801,
        },
        {
          name: "鹽埕區",
          zipCode: 803,
        },
        {
          name: "新興區",
          zipCode: 800,
        },
      ],
    },
  });

  const zipCodeToCity = {};
  const cityList = Object.keys(cityZoneList.value);
  cityList.forEach((city) => {
    cityZoneList.value[city].zones.forEach((zone, zoneIndex) => {
      zipCodeToCity[zone.zipCode] = {
        city,
        cityName: cityZoneList.value[city].name,
        zone: zone.name,
        zoneIndex,
      };
    });
  });

  const cityDefault = ref("Taipei");
  const zoneOptions = ref([]);

  const setZones = (city) => {
    const zones = cityZoneList.value[city].zones.map((zone) => zone.name);
    zoneOptions.value = zones;
  };

  const getCityInfo = (zipCode) => zipCodeToCity[zipCode] || zipCodeToCity[104];

  return {
    cityZoneList,
    cityDefault,
    zoneOptions,
    setZones,
    getCityInfo,
  };
};
