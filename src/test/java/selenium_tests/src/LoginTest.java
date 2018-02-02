package selenium_tests.src;

import org.junit.*;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import selenium_tests.src.po.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import utils.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@SuppressWarnings("Duplicates")
public class LoginTest {

  private static WebDriver driver;
  private static LoginPage login;

  @BeforeClass
  public static void setUp() throws MalformedURLException {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    driver.manage().timeouts().implicitlyWait(Constansts.IMPLICIT_WAIT, TimeUnit.MILLISECONDS);
    login = new LoginPage(driver);
    login.goTo();
  }

//  @Test
  public void loginTestAFailBoth() throws InterruptedException {
    login.login("mirek", "22222");
    Assert.assertTrue(login.isAlertPresent());
    login.confirmAlert();
  }

//  @Test
  public void loginTestBFailUsername() throws InterruptedException {
    login.login("mirek", "12345");
    Assert.assertTrue(login.isAlertPresent());
    login.confirmAlert();
  }

//  @Test
  public void loginTestCFailPassword() throws InterruptedException {
    login.login("alice", "11111");
    Assert.assertTrue(login.isAlertPresent());
    login.confirmAlert();
  }

  @Test
  public void loginTestDOk() throws InterruptedException {
    login.login("alice", String.valueOf(12345));
    TaskListPage tasks = new TaskListPage(driver);
    Assert.assertTrue(tasks.getTaskList().isDisplayed());
  }

  @AfterClass
  public static void tearDown() throws InterruptedException {
    driver.quit();
  }


}
