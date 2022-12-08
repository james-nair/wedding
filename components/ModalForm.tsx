import { ReactElement } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

type DialogHeaderPropsType = {
  onClose:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  title: string;
  disabledExit?: boolean;
};

const DialogHeader = (props: DialogHeaderPropsType): JSX.Element => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1, color: "white" }}>
          {props.title}
        </Typography>
        {!props.disabledExit && (
          <IconButton
            onClick={props.onClose}
            sx={{ color: "white" }}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

type FormOrChildren =
  | ({ form: ReactElement } & { children?: never })
  | ({ children: ReactElement } & { form?: never });

export type ModalFormProps = {
  open: boolean;
  handleModalStatus: (status: boolean) => void;
  title?: string;
  notFullWidth?: boolean;
  hideBackdrop?: boolean;
  darkBackdrop?: boolean;
  disableExit?: boolean;
  maxWidth?: false | "md" | "xs" | "sm" | "lg" | "xl";
} & FormOrChildren;

export const ModalForm = (props: ModalFormProps) => {
  //styling
  const style = {
    modalConent: {
      marginTop: "4rem",
    },
  };

  //   const handleClickOpen = () => props.handleModalStatus(true);
  const handleClickClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason !== "backdropClick") props.handleModalStatus(false);
  };

  return (
    <Dialog
      {...(props.disableExit ? { disableEscapeKeyDown: true } : {})}
      open={props.open}
      onClose={handleClickClose}
      fullWidth={props.notFullWidth ? false : true}
      hideBackdrop={props.hideBackdrop}
      maxWidth={props.maxWidth}
    >
      {props.title && (
        <DialogHeader
          onClose={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleClickClose(event, "escapeKeyDown")
          }
          title={props.title}
          disabledExit={props.disableExit}
        />
      )}

      <DialogContent
        className="mui-form"
        sx={props.title ? style.modalConent : undefined}
      >
        {props.children ?? props.form}
      </DialogContent>
    </Dialog>
  );
};
