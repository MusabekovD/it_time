import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import lizard from "../assets/lizard.jpg";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const Home = () => {
  const url = "https://autoapi.dezinfeksiyatashkent.uz/api/categories/";
  const urlImg = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";
  const token = localStorage.getItem("accessToken");
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    name_en: "",
    name_ru: "",
    images: null,
  });

 

  const getCategory = (e) => {

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data);
      })
      .catch((err) => console.log(err.error));
  };

  const create = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_en", data.name_en);
    formData.append("name_ru", data.name_ru);
    formData.append("images", data.images);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        getCategory();
        toast.success("Muvafaqqiyatli qo'shildi!");
      })
      .catch((err) => {
        console.log(err.error);
        toast.error("yaratilmadi");
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <div className="flex justify-center mb-8">
        <h2 className="text-3xl py-6 w-full text-center bg-slate-300 ">
          CRUD Operations
        </h2>
      </div>
      <div className="container mx-auto my-20 pl-[120px] flex gap-3">
        {/*  <TextField
            id="outlined-basic"
            label="Name_En"
            variant="outlined"
            onChange={(e) => setData({ ...data, name_en: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Name_Ru"
            variant="outlined"
            onChange={(e) => setData({ ...data, name_ru: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            type="file"
            onChange={(e) => setData({ ...data, images: e.target.files[0] })}
          />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className="w-[200px]"
          >
            Submit
          </Button> */}
        <form action="" onSubmit={create}>
          <input
            type="text"
            placeholder="text"
            onChange={(e) => setData({ ...data, name_en: e.target.value })}
          />
          <input
            type="text"
            placeholder="text"
            onChange={(e) => setData({ ...data, name_ru: e.target.value })}
          />

          <input
            type="file"
            onChange={(e) => setData({ ...data, images: e.target.files[0] })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="container mx-auto flex flex-wrap justify-center gap-6 ">
        {category.map((item, index) => (
          <Card key={index} sx={{ maxWidth: 300 }}>
            <CardMedia
              sx={{ height: 340 }}
              image={`${urlImg}${item.image_src}`}
              title="green iguana"
              style={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="error">
                DELETE
              </Button>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
