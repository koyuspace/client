import { Button } from "./button";
import Image from "next/image";

export default function LogoButton({text = "", ...props}: React.ComponentProps<"button"> & {text?: string}) {
    return (
        <Button variant="outline" onClick={props.onClick}><Image src="/img/pb-icon_small-rendered.png" height={16} width={16} alt="Logo" /> {text}</Button>
    );
}