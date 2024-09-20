import GetSesion from "@/libs/session";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { sendEmail } from "@/libs/mailgun";
import { executeActionForm } from "@/libs/API/newsLetter";



export default async function sendAdministrativeEmailPage() {
  const session = await GetSesion();

  if (!session) {
    console.log("No session");
    return <></>;
  }

  await connectMongo();
  const user = await User.findOne({ _id: session.user.id });
  console.log(user);

  if (user.email != "popageo02@gmail.com") {
    console.log("Not admin");
    return <></>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        action={executeActionForm}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="input2">
            Message
          </label>
          <textarea
            className="h-50 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="input2"
            name="message" // Capture this in the form data
            placeholder="Enter text"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            name="action"
            value="test"
          >
            Test
          </button>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            name="action"
            value="send"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
