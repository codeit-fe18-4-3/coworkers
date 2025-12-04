import { Button } from "@/components/button";
import {
  Alert as AlertComponent,
  Sheet as SheetComponent,
} from "@/components/modal";
import type { Meta } from "@storybook/nextjs";
import { overlay, OverlayProvider } from "overlay-kit";

const meta = {
  title: "Components/Modal",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AlertComponent>;

export default meta;

export function Modal() {
  return (
    <div id="modal-root" className="flex flex-col items-center gap-4">
      <OverlayProvider>
        <MemberInvitationAlertExample />
        <ToDoListAlertExample />
        <ResetPasswordAlertExample />
        <ChangePasswordAlertExample />
        <WithdrawalAlertExample />
        <LogoutAlertExample />
        <CreateToDoSheetExample />
      </OverlayProvider>
    </div>
  );
}

function MemberInvitationAlertExample() {
  return (
    <Button
      title="멤버 초대 Alert"
      isFullWidth={false}
      onClick={() => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <AlertComponent
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="멤버 초대"
              message="그룹에 참여할 수 있는 링크를 복사합니다."
              actions={[<Button key="alert-close" title="링크 복사하기" />]}
            />
          ),
          { overlayId: "member-invitation-alert" }
        );
      }}
    />
  );
}

function ToDoListAlertExample() {
  return (
    <Button
      title="할 일 목록 Alert"
      isFullWidth={false}
      onClick={() => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <AlertComponent
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="할 일 목록"
              content={
                <input
                  className="w-full border-border-primary bg-amber-50 p-4"
                  placeholder="목록 명을 입력해주세요."
                />
              }
              actions={[<Button key="alert-action" title="만들기" />]}
            />
          ),
          { overlayId: "todo-list-alert" }
        );
      }}
    />
  );
}

function ResetPasswordAlertExample() {
  return (
    <Button
      title="비밀번호 재설정 Alert"
      isFullWidth={false}
      onClick={() => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <AlertComponent
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="비밀번호 재설정"
              message="비밀번호 재설정 링크를 보내드립니다."
              content={
                <input
                  className="w-full border-border-primary bg-amber-50 p-4"
                  placeholder="이메일을 입력하세요."
                />
              }
              actions={[
                <Button
                  key="alert-close"
                  variant="outlinedPrimary"
                  title="닫기"
                />,
                <Button key="alert-action" title="링크 보내기" />,
              ]}
            />
          ),
          { overlayId: "reset-password-alert" }
        );
      }}
    />
  );
}

function ChangePasswordAlertExample() {
  return (
    <Button
      title="비밀번호 변경 Alert"
      isFullWidth={false}
      onClick={() => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <AlertComponent
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="비밀번호 변경하기"
              content={
                <>
                  <input
                    className="w-full border-border-primary bg-amber-50 p-4"
                    placeholder="새 비밀번호를 입력해주세요."
                  />
                  <input
                    className="mt-2 w-full border-border-primary bg-amber-50 p-4"
                    placeholder="새 비밀번호를 다시 한 번 입력해주세요."
                  />
                </>
              }
              actions={[
                <Button
                  key="alert-close"
                  variant="outlinedPrimary"
                  title="닫기"
                />,
                <Button key="alert-action" title="변경하기" />,
              ]}
            />
          ),
          { overlayId: "change-password-alert" }
        );
      }}
    />
  );
}

function WithdrawalAlertExample() {
  return (
    <Button
      title="회원 탈퇴 Alert"
      isFullWidth={false}
      onClick={() => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <AlertComponent
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="회원 탈퇴를 진행하시겠어요?"
              message={`그룹장으로 있는 그룹은  자동으로 삭제되고,\n모든 그룹에서 나가집니다.`}
              actions={[
                <Button
                  key="alert-close"
                  variant="outlinedSecondary"
                  title="닫기"
                />,
                <Button
                  key="alert-action"
                  variant="danger"
                  title="회원 탈퇴"
                />,
              ]}
            />
          ),
          { overlayId: "withdrawal-alert" }
        );
      }}
    />
  );
}

function LogoutAlertExample() {
  return (
    <Button
      title="로그아웃 Alert"
      isFullWidth={false}
      onClick={() => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <AlertComponent
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="로그아웃 하시겠어요?"
              actions={[
                <Button
                  key="alert-close"
                  variant="outlinedSecondary"
                  title="닫기"
                />,
                <Button key="alert-action" variant="danger" title="로그아웃" />,
              ]}
            />
          ),
          { overlayId: "logout-alert" }
        );
      }}
    />
  );
}

function CreateToDoSheetExample() {
  return (
    <Button
      title="할 일 만들기 Sheet"
      isFullWidth={false}
      onClick={() => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <SheetComponent
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="할 일 만들기"
              message={`할 일은 실제로 행동 가능한 작업 중심으로\n작성해주시면 좋습니다.`}
              content={
                <div className="flex flex-col gap-6">
                  <SheetComponent.Section title="할 일 제목">
                    <input
                      className="w-full border-border-primary bg-amber-50 p-4"
                      placeholder="목록 명을 입력해주세요."
                    />
                  </SheetComponent.Section>
                  <SheetComponent.Section title="할 일 제목">
                    <input
                      className="w-full border-border-primary bg-amber-50 p-4"
                      placeholder="목록 명을 입력해주세요."
                    />
                  </SheetComponent.Section>
                  <SheetComponent.Section title="할 일 제목">
                    <input
                      className="w-full border-border-primary bg-amber-50 p-4"
                      placeholder="목록 명을 입력해주세요."
                    />
                  </SheetComponent.Section>
                </div>
              }
              action={<Button key="alert-close" title="링크 복사하기" />}
            />
          ),
          { overlayId: "create-to-do-sheet" }
        );
      }}
    />
  );
}
