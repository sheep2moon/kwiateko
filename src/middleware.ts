import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const baseURL = request.nextUrl.origin;
    const cookieHeader = request.headers.get("cookie") || "";
    const response = await fetch(`${baseURL}/api/auth/get-session`, {
        method: "GET", // Or POST, depending on your API
        headers: {
            "Content-Type": "application/json", // Or whatever your API expects
            Cookie: cookieHeader // Forward cookies
        },
        cache: "no-store" // Important if you're dealing with session data
    });

    if (!response.ok) {
        return NextResponse.next();
    }
    try {
        const data = await response.json();
        console.log(data.session);
        return NextResponse.redirect(new URL("/account", request.url));
    } catch (error) {
        console.error("Error parsing JSON response", error);
    }
    return NextResponse.next();
    // const data = await response.json();
    console.log(response);
    return NextResponse.next();
}

export const config = {
    matcher: ["/sign-in"] // Specify the routes the middleware applies to
};
