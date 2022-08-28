import "./styles.css";
import { useState } from "react";
import { z } from "zod";
import { useZorm } from "react-zorm";
import zachInfo from "./zachInfo.json";

/* I decided to use Zods regex to parse the incoming url and check if it is valid. I dont tend to use regex unless it is a very specific and small use case and this fit the bill.

    I am convinced that there is a way to pass all acceptable values into a single endsWith() call but the answer elludes me, as far as I can tell 
    endsWith() accepts a single string and an optional error message to display if the string does not match. 
    
    If I figfure out a way to pass multiple values (array map?, tuple?? etc) I will update this to reflect it but it was eating at me this weekend and I had to enhance this a bit. 
  
  
  **/

const VALID_IMAGE_URL = z
  .string()
  .regex(
    /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/,
    "Must be a valid image url that ends in .png, .jpg, .jpeg, or .gif"
  );

const FormSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character long"),
  avatarImageUrl: VALID_IMAGE_URL,
});

function ErrorMessage(props: { message: string }) {
  return <div className="error-message">{props.message}</div>;
}

export default function App() {
  const [userProfile, setUserProfile] = useState({
    name: "",
    avatarImage: "",
  });

  const zForm = useZorm("enter deatils", FormSchema, {
    onValidSubmit(e) {
      e.preventDefault();
      setUserProfile({
        name: e.data.name,
        avatarImage: e.data.avatarImageUrl,
      });
    },
  });

  const disabled = zForm.validation?.success === false;

  const handleClick = () => {
    const { name, avatar } = zachInfo;
    setUserProfile({
      name: name,
      avatarImage: avatar,
    });
  };

  return (
    <div>
      <h1>
        {userProfile.name === "Zach" ? "Hey my name is " : "Hello "}
        {userProfile.name} 👋🏻
      </h1>

      {userProfile.avatarImage && (
        <img src={userProfile.avatarImage} alt="avatar" />
      )}
      <button onClick={handleClick}>Set my personal name and avatar</button>

      <h2>What's your name??</h2>

      <form ref={zForm.ref}>
        Enter your name:
        <input
          type="text"
          name={zForm.fields.name()}
          className={zForm.errors.name("errored")}
        />
        {zForm.errors.name((err) => (
          <ErrorMessage message={err.message} />
        ))}
        <br />
        <br />
        Enter your avatar image url:
        <input
          type="text"
          name={zForm.fields.avatarImageUrl()}
          className={zForm.errors.avatarImageUrl("errored")}
        />
        {zForm.errors.avatarImageUrl((err) => (
          <ErrorMessage message={err.message} />
        ))}
        <button disabled={disabled} type="submit">
          Set your name and avatar
        </button>
      </form>
      <pre>Validation status: {JSON.stringify(zForm.validation, null, 2)}</pre>
    </div>
  );
}
