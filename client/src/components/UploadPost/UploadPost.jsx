import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import "./uploadpost.css";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../../utils";

const UploadPost = () => {
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const [image, setImage] = useState(null);
    const [base64, setBase64] = useState("");

    const { addToPosts, setAlert } = useGlobalContext();
    const navigator = useNavigate();

    const submitPost = (post) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigator("/login");
            return setAlert("Please Log In To Uplaod");
        }
        console.log(post);
        axios
            .post("/posts", post, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
                addToPosts({ ...res.data });
                setAlert("Post Uploaded");
            })
            .catch((err) =>
                refreshAccessToken(() => {
                    let tagArray = [];
                    if (tags) {
                        tagArray = tags.split(" ");
                    }
                    submitPost({ content, tags: tagArray });
                }, setAlert)
            );
    };

    const getBase64 = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            let binString = event.target.result;
            setBase64(btoa(binString));
        };
        reader.readAsBinaryString(file);
    };

    return (
        <>
            <form className="uploadPostContainer">
                <div className="uploadPostInnerContainer">
                    <img
                        src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
                        className="profilePicture"
                    />
                    <div className="enterPostText">
                        <textarea
                            type="text"
                            placeholder="What's Happening? Write here to share..."
                            value={content}
                            required
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Space seperated #tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <BsFillImageFill className="fileUploadIcon" />
                    <input
                        type="file"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => {
                            // Set image for preview
                            setImage(e.target.files[0]);

                            // Get base64 image and save to state
                            getBase64(e.target.files[0]);

                            // https://medium.com/@blturner3527/storing-images-in-your-database-with-base64-react-682f5f3921c2
                            // https://stackoverflow.com/questions/56769076/how-to-show-base64-image-in-react
                        }}
                    />
                    {image && (
                        <>
                            <img
                                src={URL.createObjectURL(image)}
                                width={"80px"}
                            />
                        </>
                    )}
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (!content) {
                            return setAlert("Enter text to create a post");
                        }

                        let tagArray = [];
                        if (tags) {
                            tagArray = tags.split(" ");
                        }
                        submitPost({
                            content,
                            tags: tagArray,
                            image: base64,
                        });

                        setContent("");
                        setTags("");
                    }}
                >
                    Submit Post
                </button>
            </form>
        </>
    );
};

export default UploadPost;
