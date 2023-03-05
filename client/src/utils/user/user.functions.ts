import { instance } from "../functions";

export const updatePersonalInformation = (
  e: React.FormEvent<HTMLFormElement>,
  username: string,
  profileImage: string,
  gender: string,
  x: number,
  y: number,
  width: number,
  height: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  setLoading(true);
  instance
    .put("/user/update-user", {
      username,
      profileImage,
      gender,
      x,
      y,
      width,
      height,
    })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        location.reload();
      }
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};
