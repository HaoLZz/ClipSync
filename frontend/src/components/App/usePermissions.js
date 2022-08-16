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
          allowWithoutGesture: true,
        });

        setPermissions({
          read: readPermissionStatus.state,
          write: writePermissionStatus.state,
        });

        readPermissionStatus.onchange = () => {
          console.log(
            `${readPermissionStatus.name} changes to ${readPermissionStatus.state}`,
          );
          setPermissions((state) => {
            return { ...state, read: readPermissionStatus.state };
          });
        };

        writePermissionStatus.onchange = () => {
          console.log(
            `${writePermissionStatus.name} changes to ${writePermissionStatus.state}`,
          );
          setPermissions((state) => {
            return { ...state, write: writePermissionStatus.state };
          });
        };

        if (writePermissionStatus.state !== 'granted') {
          await window.navigator.clipboard.writeText(
            'requesting clipboard write permission',
          );
        }

        if (readPermissionStatus.state !== 'granted') {
          await window.navigator.clipboard.readText();
        }
        return { readPermissionStatus, writePermissionStatus };
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    let permissionsStatus = null;
    getPermissions().then((status) => (permissionsStatus = status));

    return () => {
      if (permissionsStatus) {
        const { readPermissionStatus, writePermissionStatus } =
          permissionsStatus;
        readPermissionStatus.onchange = null;
        writePermissionStatus.onchange = null;
        console.log('Clean up event listeners');
      }
    };
  }, []);

  return { permissions, error };
}
