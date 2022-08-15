import { set } from 'mongoose';
import { useState, useEffect } from 'react';

export default function usePermissions() {
  const [permissions, setPermissions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const readPermissionStatus = await window.navigator.permissions.query({
          name: 'clipboard-read',
          allowWithoutGesture: true,
        });
        const writePermissionStatus = await window.navigator.permissions.query({
          name: 'clipboard-write',
        });

        console.log('read-clipboard:', readPermissionStatus);
        console.log('write-clipboard:', writePermissionStatus.state);
        setPermissions({
          readPermissionStatus,
          writePermissionStatus,
        });

        readPermissionStatus.onchange = () => {
          console.log(
            `${readPermissionStatus.name} changes to ${readPermissionStatus.state}`,
          );
          setPermissions((state) => {
            return { ...state, readPermissionStatus };
          });
        };

        if (readPermissionStatus.state !== 'granted') {
          await window.navigator.clipboard.read();
        }
        return readPermissionStatus;
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    const readStatus = getPermissions();

    return () => {
      readStatus.onchange = null;
    };
  }, []);

  return { permissions, error };
}

// Promise.all(
// 	PERMISSIONS.map( descriptor => navigator.permissions.query(descriptor) )
// ).then( permissions => {
//   permissions.forEach( (status, index) => {
//     let descriptor = PERMISSIONS[index],
//     	name = permissionName(descriptor),
//     	btn = document.createElement('button');
//     btn.title = 'Click to request permission';
//     btn.textContent = name;
//     // Clicking a button (re-)requests that permission:
//     btn.onclick = () => {
//       navigator.permissions.request(descriptor)
//         .then( status => { log(`Permission ${status.state}.`); })
//         .catch( err => { log(`Permission denied: ${err}`); });
//     };
//     // If the permission status changes, update the button to show it
//     status.onchange = () => {
//       btn.setAttribute('data-state', status.state);
//     };
//     status.onchange();
//     permbuttons.appendChild(btn);
//   });
// });
