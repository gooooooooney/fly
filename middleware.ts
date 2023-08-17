import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"

// This function can be marked `async` if using `await` inside
export default withAuth(function middleware(request) {
 
}, {
  callbacks: {
    authorized({ req, token }) {

      return true
    }
  }
})
