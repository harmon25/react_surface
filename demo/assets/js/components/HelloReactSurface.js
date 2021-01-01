import React, { useEffect, useState } from "react";
import { useLiveContext } from "react_surface";

// props are provided by the server.
export default (props) => {
  const [count, setCount] = useState(0);
  const { pushEvent, handleEvent, pushEventTo } = useLiveContext();

  useEffect(() => {
    handleEvent("from_server", (val) => {
      console.log("from server!");
      console.log(val);
    });
  }, []);

  const incCount = () => {
    setCount((c) => c + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    pushEvent("update_name", { new_name: data.get("name") });
  };

  return (
    <div>
      <h3>Props:</h3>
      <div>{JSON.stringify(props)}</div>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="new name" />
        <button type="submit"> Update Name </button>
      </form>
      <div>
        <p>Count: {count}</p>
        <button type="button" onClick={incCount}>
          Inc
        </button>
      </div>
      <button type="button" phx-click="trigger-event">
        Trigger Server Event
      </button>
    </div>
  );
};
