import "./styles.css";
import { useState } from "react";
import { z } from "zod";
import { useZorm } from "react-zorm";
import zachInfo from "./zachInfo.json";

const FormSchema = z.object({
  name: z.string(),
  avatarImageUrl: z.string().url("Must be a valid URL that points to an image"),
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
