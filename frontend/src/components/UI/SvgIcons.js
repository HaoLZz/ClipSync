import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as IconPDF } from '../../assets/icon-pdf.svg';
import { ReactComponent as IconDOC } from '../../assets/icon-doc.svg';
import { ReactComponent as IconDOCX } from '../../assets/icon-docx.svg';
import { ReactComponent as IconTXT } from '../../assets/icon-txt.svg';
import { ReactComponent as IconLogo } from '../../assets/logo.svg';

function PdfIcon(props) {
  return <SvgIcon component={IconPDF} {...props} inheritViewBox />;
}

function DocIcon(props) {
  return <SvgIcon component={IconDOC} {...props} inheritViewBox />;
}

function DocxIcon(props) {
  return <SvgIcon component={IconDOCX} {...props} inheritViewBox />;
}

function TxtIcon(props) {
  return <SvgIcon component={IconTXT} {...props} inheritViewBox />;
}

function LogoIcon(props) {
  return <SvgIcon component={IconLogo} {...props} inheritViewBox />;
}

export { PdfIcon, DocIcon, DocxIcon, TxtIcon, LogoIcon };
