import Link from 'next/link'
import React from 'react'
import Container from "./ui/container"
import { Linkedin, Instagram, Github, Twitter } from "lucide-react"

export default function Footer() {
    return (
        <footer className="py-8">
            <Container>
                <div className="container flex flex-wrap items-center justify-center px-4 mx-auto lg:justify-between">
                    <div className="flex flex-wrap justify-center mb-4 lg:mb-0">
                        <ul className="flex items-center space-x-4">
                            <li><Link href={"/"}>Home</Link></li>
                            <li><Link href={"/about"}>About</Link></li>
                            <li><Link href={"/contact"}>Contact US</Link></li>
                            <li><Link href={"/terms"}>Terms & Condition</Link></li>
                        </ul>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Link href={""}>
                            <Instagram className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        </Link>
                        <Link href={""}>
                            <Github className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        </Link>
                        <Link href={""}>
                            <Twitter className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        </Link>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">
                        @2024 All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    )
}
