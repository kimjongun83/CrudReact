import { Button } from "react-bootstrap";

const ItemTable = ({ user, handleClickEditModal, handleClickDeleteModal }) => {
  return (
    <>
      {user.length > 0 &&
        user.map((item, key) => (
          <tr key={key}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.fullName}</td>
            <td>
              <Button
                variant={"success"}
                onClick={() => handleClickEditModal(item.id)}
              >
                Edit
              </Button>
              <Button
                variant={"danger"}
                onClick={() => handleClickDeleteModal(item.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
    </>
  );
};
export default ItemTable;
