import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./button";

function ChatPermissionError() {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex-1">
          <p className="flex-1">
            You do not have permission to view this chat.
            <br />
            <span className="font-bold">
              Please ask the chat admin to add you to the chat.
            </span>
          </p>
        </AlertDescription>
        <Link href="/chat" replace>
          <Button variant="destructive">Dismiss</Button>
        </Link>
      </Alert>
    );
  }
  export default ChatPermissionError;