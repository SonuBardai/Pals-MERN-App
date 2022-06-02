const PostHeader = () => {
	return (
		<>
			<div className="postHeader">
				<img
					src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
					alt="profilePic"
					className="postProfilePic"
				/>
				<div className="postInfo">
					<div className="postUsername">John Doe</div>
					<div className="postDate">28 Aug 2022</div>
				</div>
			</div>
		</>
	);
};

export default PostHeader;
