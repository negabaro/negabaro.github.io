export const getUtilityDataCookie = key => {
  //weatherが存在しない場合、w_defaultを返す
  const cookieMock =
    "{weather:'w_kinki_sumoto',traffic:'4',business:'',mytown:'',seiza:['Aries','2']}";
  return JSON.parse(cookieMock.replace(/'/g, '"').replace(/(\w+)?:/g, '"$1":'));
};
