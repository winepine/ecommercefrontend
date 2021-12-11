import { useEffect, useState } from "react";
import "../styles/signin.css";
import { useNavigate } from "react-router";
import AddCategory from "./AdminComps/AddCategory";
import AddProduct from "./AdminComps/AddProduct";
import CreateAdmin from "./AdminComps/CreateAdmin";
import DeleteUser from "./AdminComps/DeleteUser";
import ViewDetails from "./AdminComps/ViewDetails";
const PostAdminPage = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  const onAdminButtonClick = (e) => {
    Object.keys(buttons).forEach((v) => (buttons[v] = false));
    setButtons({
      ...buttons,
      [e.target.name]: true,
    });
  };
  useEffect(() => {
    let token = localStorage.getItem("ecomtoken");
    if (!token) navigate("/");
    async function fetchData() {
      try {
        const result = await fetch(
          "/api/homepage/?authorization=bearer " + token
        );
        const user = await result.json();
        setUserdata(user);
      } catch (x) {
        localStorage.removeItem("ecomtoken");
        navigate("/");
      }
    }
    fetchData();
    document.title = "Admin Page";
    // localStorage.setItem("ecomtoken", "123");
    // if (token) {
    //   console.log("YES");
    // } else {
    //   navigate("/");
    // }
  }, []);
  const [buttons, setButtons] = useState({
    addproduct: true,
    viewdetails: false,
    addcategory: false,
    deleteuser: false,
    createadmin: false,
  });
  return (
    <div>
      <div className="adminmain">
        <div className="float-child2">
          <div className="adminleft">
            <div className="adminName">
              <h2>Administrator</h2>
              <h1>Management</h1>
            </div>
            <div className="adminButtons">
              <button
                name="addproduct"
                className={
                  buttons.addproduct ? "adminSelected" : "adminNotSelected"
                }
                onClick={onAdminButtonClick}
              >
                Add Product
              </button>
              <button
                name="viewdetails"
                className={
                  buttons.viewdetails ? "adminSelected" : "adminNotSelected"
                }
                onClick={onAdminButtonClick}
              >
                View Details
              </button>
              <button
                name="addcategory"
                className={
                  buttons.addcategory ? "adminSelected" : "adminNotSelected"
                }
                onClick={onAdminButtonClick}
              >
                Add Category
              </button>
              <button
                name="deleteuser"
                className={
                  buttons.deleteuser ? "adminSelected" : "adminNotSelected"
                }
                onClick={onAdminButtonClick}
              >
                Delete User
              </button>
              <button
                name="createadmin"
                className={
                  buttons.createadmin ? "adminSelected" : "adminNotSelected"
                }
                onClick={onAdminButtonClick}
              >
                Create Admin
              </button>
            </div>
          </div>
        </div>
        <div className="float-child2">
          <div className="adminright">
            {buttons.addproduct && <AddProduct />}
            {buttons.viewdetails && <ViewDetails adminDetails={userdata} />}
            {buttons.addcategory && <AddCategory />}
            {buttons.deleteuser && <DeleteUser />}
            {buttons.createadmin && <CreateAdmin />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostAdminPage;