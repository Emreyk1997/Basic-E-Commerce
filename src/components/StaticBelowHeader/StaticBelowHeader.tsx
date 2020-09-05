import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import './StaticBelowHeader.css';

function StaticBelowHeader() {
  return (
    <div className="static-header">
      <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Anasayfa
      </Link>
      <Link color="inherit" href="/getting-started/installation/">
        Spor Ürünleri
      </Link>
      <Link color="inherit" href="/getting-started/installation/">
        Forma
      </Link>
      <Typography color="textPrimary">NBA</Typography>
    </Breadcrumbs>
    </div>
  );
}

export default StaticBelowHeader;
