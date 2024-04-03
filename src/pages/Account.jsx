import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    // <> azért Fragment-et használunk és nem <div>-et hogy a AppLayout-ban található main CSS formázása vonatkozon midnen Outlet-re a <div> bezavarna.
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
