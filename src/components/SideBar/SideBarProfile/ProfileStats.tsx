
interface ProfileStat {
 displayName: string,
 value: string
}

interface ProfileStatsPropsType {
  className: string
}

const profileStatsData: Array<ProfileStat> = [
  {
    displayName: 'Who viewed your profile',
    value: '2,483'
  },
  {
    displayName: 'Views of your post ',
    value: '1,365'
  },
]

const ProfileStats = ({
  className
}: ProfileStatsPropsType) => {
  
  const profileStat = (stat: ProfileStat, index: number) : any => {
    return (
      <div className="flex justify-between w-full p-2 cursor-pointer hover:bg-gray-200" key={index}>
        <div className="text-gray-500 font-bold text-sm w-full">{stat.displayName}</div>
        <div className="text-blue-500 font-bold text-sm w-1/2">
          {stat.value}
        </div>
      </div>
    );
  }

  const profileStats = () => {
    return profileStatsData.map((stat, index) => profileStat(stat, index));
  }

  return (
    <div
      className={className}
    >
      {profileStats()}
    </div>
  );
};

export default ProfileStats;
