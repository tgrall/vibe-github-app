import {redirect} from 'next/navigation';

// This page only renders when the user is on the fallback page (e.g. `/`)
export default function RootPage() {
  redirect('/fr');
}
