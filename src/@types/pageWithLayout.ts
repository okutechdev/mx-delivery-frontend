import { NextPage } from 'next'
import type { ReactElement } from 'react'
import EmptyLayout from '../components/EmptyLayout'
import MainLayout from '../components/Layout'

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout }
export type PageWithoutLayoutType = NextPage & { layout: typeof EmptyLayout }

export type PageWithLayoutType =
 | PageWithMainLayoutType
 | PageWithoutLayoutType

export type LayoutProps = ({ children }: { children: ReactElement}) => ReactElement

export default PageWithLayoutType