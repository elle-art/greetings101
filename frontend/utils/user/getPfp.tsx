import { useUser } from "./UserContext";

const pfps = [
    {
        id: "default",
        imageLink: "/images/default.jpg",
        alt: "Profile Avatar"
    },
    {
      id: "bear",
      imageLink: "/images/bear.jpg",
      alt: "Bear"
    },
  ];

const getPfp = (pfpId : string) => {
    const pfp = pfps.find(picture => pfpId === picture.id);
    if(pfp) {
        return {
            imageLink: pfp.imageLink,
            alt: pfp.alt
        };
    } else {
        return {
            imageLink: pfps[0].imageLink,
            alt: pfps[0].alt
        };
    }
};

export default getPfp;