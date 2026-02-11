// export async function action({ request }) {
//   const formData = await request.formData();
//   const firstName = formData.get("firstName");
//   const lastName = formData.get("lastName");
//   const email = formData.get("email");
//   const termsAccepted = formData.get("termsAccepted");
//   const futureContact = formData.get("futureContact");

//   const fieldErrors = {};

//   if (!firstName) {
//     fieldErrors.firstName = ["First name is required"];
//   }
//   if (!lastName) {
//     fieldErrors.lastName = ["Last name is required"];
//   }
//   if (!email) {
//     fieldErrors.email = ["Email is required"];
//   }
//   if (!termsAccepted) {
//     fieldErrors.termsAccepted = ["Terms need to be accepted"];
//   }
//   if (!futureContact) {
//     fieldErrors.futureContact = ["Future contact needs to accepted"];
//   }

//   if (Object.keys(fieldErrors).length > 0) {
//     return {
//       ok: false,
//       fieldErrors
//     };
//   }

//   const response = await fetch(`${API_URL}/register-interest`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email })
//   });
//   if (!response.ok) {
//     return {
//       ok: false,
//       message: "Registration failed"
//     };
//   }

//   return {
//     ok: true,
//     message: "You’re registered. Check your email."
//   };
// }
