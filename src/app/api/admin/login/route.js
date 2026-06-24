export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (username === "admin@r4x.com" && password === "r4xsensi") {
      // For simplicity and client security, we return a token and success state.
      return Response.json({
        success: true,
        token: "r4x-admin-authorized-token-2026",
        message: "Login successful"
      });
    }

    return Response.json({
      success: false,
      error: "Invalid username or password"
    }, { status: 401 });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
