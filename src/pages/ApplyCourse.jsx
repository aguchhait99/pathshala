import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applyCourse } from "../service/Api";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";

const ApplyCourse = () => {
  const { register, handleSubmit } = useForm();
  const [auth] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await applyCourse(id, data);
      toast.success(response?.data?.message);
      navigate('/courses')
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Layout title={"Apply-Course"}>
        <Container
          sx={{
            width: "50%",
            boxShadow: "0px 0px 30px rgba(0,0,0,0.5)",
            mb: 5,
          }}
        >
          <h2 style={{ paddingTop: 30, textAlign: "center" }}>Apply Course</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                label="Name"
                type="text"
                name="name"
                color="error"
                focused
                sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
                value={auth?.user?.name}
                InputProps={{
                  readOnly: true,
                }}
                {...register("name", { required: true })}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                placeholder="Don't worry!! Your mail id will remain private."
                color="error"
                focused
                sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
                value={auth?.user?.email}
                InputProps={{
                  readOnly: true,
                }}
                {...register("email", { required: true })}
              />
            </div>
            <TextField
              id="outlined-multiline-flexible"
              type="number"
              multiline
              maxRows={5}
              label="Phone Number"
              name="phone"
              color="error"
              focused
              sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
              value={auth?.user?.mobile}
              {...register("phone", { required: true })}
            />
            <TextField
              id="outlined-multiline-flexible"
              type="text"
              multiline
              maxRows={5}
              label="City"
              name="city"
              color="error"
              focused
              sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
              {...register("city", { required: true })}
            />
            <TextField
              id="outlined-multiline-flexible"
              type="text"
              multiline
              maxRows={5}
              label="Address"
              name="address"
              color="error"
              focused
              sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
              {...register("address", { required: true })}
            />
            <TextField
              id="outlined-multiline-flexible"
              type="text"
              multiline
              maxRows={5}
              label="Qualification"
              name="qualification"
              color="error"
              focused
              sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
              {...register("qualification", { required: true })}
            />
            <TextField
              id="outlined-multiline-flexible"
              type="text"
              multiline
              maxRows={5}
              label="Programming Knowledge"
              name="programing_knowledge"
              color="error"
              focused
              sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
              {...register("programing_knowledge", { required: true })}
            />
            <TextField
              id="outlined-multiline-flexible"
              type="text"
              multiline
              maxRows={5}
              label="Experience"
              name="experiance"
              color="error"
              focused
              sx={{ marginLeft: 5, marginTop: 5, width: "90%" }}
              {...register("experiance", { required: true })}
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ margin: 5, ml: "18vw" }}
            >
              Add Comment
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default ApplyCourse;
