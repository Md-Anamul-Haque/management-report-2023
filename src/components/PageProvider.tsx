import React, { useEffect } from "react";
import { Helmet } from 'react-helmet';
import Navbar from "./Nav";
import styles from './Page.module.css';
// const pageid = uuidv4()

const PageProvider = ({ children, w, h, pageName }: { children: React.ReactNode, w: string; h: string; pageName: string; }) => {
  useEffect(() => {
    document.documentElement.style.page = 'print-page-size';
  }, [w, h, pageName]);
  return <div className="grid justify-center" style={{
    minWidth: w
  }}>
    <Helmet>
      <title>{pageName || ''}</title>
      <style type="text/css">{String(`
        @page print-page-size{
            size:${w} ${h};
            margin: 12mm 16mm 12mm 16mm;
          }
    `)}</style>
    </Helmet>
    <Navbar />
    <div className={styles.page} style={{
      width: w,
    }}>
      {children}
    </div>
  </div>
}
export default PageProvider