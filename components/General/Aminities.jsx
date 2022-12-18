import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";

const AminitiesData = [
  { title: "Bedroom", value: 2, Icon: KingBedIcon },
  { title: "Bathroom", value: 2, Icon: BathtubIcon },
  { title: "m²", value: 250, Icon: StraightenIcon },
];

const Aminities = ({ data = AminitiesData }) => (
  <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-12 mt-4 md:mt-6 lg:mt-12 w-full">
    {data?.map((amintity) => (
      <CardAminity key={amintity.title} {...amintity} />
    ))}
  </div>
);

const CardAminity = ({ title, Icon, value }) => {
  return (
    <div className="flex items-center gap-[4px] w-full">
      <Icon sx={{ fontSize: { md: "20px", xl: "32px" } }} />
      <div className="flex items-center gap-[2px]">
        <h1 className="text-[14px] md:text-[18px]">{value}</h1>
        <h1 className="text-[14px] md:text-[18px]">{title}</h1>
      </div>
    </div>
  );
};

export default Aminities;
