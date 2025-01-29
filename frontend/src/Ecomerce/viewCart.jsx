import { handelStoreContext } from "../context/StoreContext";

function ViewCart() {
  const { cart, setCart,handelBuyProduct } = handelStoreContext();

  const total = cart.reduce((a, b) => a + b.price, 0);

  const handleDelete = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="flex">
      <div className="m-4 bg-slate-100 w-4/6 pb-4 rounded-md">
        <h2 className="font-medium text-3xl pl-2 pt-6">Your Cart</h2>
        <div className="divider divide-red-100 pl-2 pr-2"></div>
        {cart.map((el, i) => (
          <div
            className="card card-side bg-base-100 shadow-xl mr-4 mb-2 ml-2 h-52"
            key={i}
          >
            <figure>
              <img
                className="w-72 rounded-md ml-4"
                src={el.productImage}
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{el.productName}</h2>
              <p>Rs : {el.price.toLocaleString()}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn bg-red-600 text-white font-medium text-2xl hover:bg-red-700"
                  onClick={() => handleDelete(el._id)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart?.length > 0 && (
        <div className=" bg-slate-100 w-56 h-44 rounded-md mt-4 ml-10 relative">
          <div className="ml-6 mt-6 mb-6 text-xl">
            <p>
              Items : <span className="font-medium">{cart.length}</span>
            </p>
            <p>
              Subtotal :{" "}
              <span className="font-medium">{total.toLocaleString()}</span>
            </p>
          </div>

          <button className="btn btn-primary text-white font-medium text-2xl ml-12 mb-6 inset-x-0 bottom-0 absolute w-32" onClick={handelBuyProduct}>
            Buy cart
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewCart;
