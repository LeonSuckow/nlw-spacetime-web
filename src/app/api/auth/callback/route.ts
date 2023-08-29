import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  let { nextUrl, headers, url } = request
  nextUrl.host = headers.get('Host') ?? nextUrl.host
  url = nextUrl.href

  const { searchParams } = new URL(url)

  const code = searchParams.get('code')
  const redirectTo = request.cookies.get('redirectTo')?.value
  try {
    const registerResponse = await api.post('/register', {
      code,
    })

    const { token } = registerResponse.data

    const redirectURL = redirectTo ?? new URL('/', url)

    const cookieExpiresInSeconds = 60 * 60 * 24 * 30
    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
      },
    })
  } catch (error: any) {
    console.log('erro aqui', error)
    throw new Error(error)
  }
}
