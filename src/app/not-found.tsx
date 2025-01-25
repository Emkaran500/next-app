import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles["not-found"]}>
      <div>404 такой вещи тут нет ищи в другом месте</div>
      <Image
        alt="not found"
        src="https://comodosslstore.com/blog/wp-content/uploads/2024/01/website-page-found-error-robot-character-broken-chatbot-mascot-disabled-site-technical-work_502272-1888.jpg"
        width={500}
        height={500}
      />
      <Link href="/">
        <Button variant="default">Go back to the main page</Button>
      </Link>
    </div>
  );
}